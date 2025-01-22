/*
 * This source file is part of an OSTIS project. For the latest info, see http://ostis.net
 * Distributed under the MIT License
 * (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#include "utils/NumberUtils.hpp"

#include "keynodes/Keynodes.hpp"

namespace utils
{

bool NumberUtils::isPositiveInteger(std::string const & str)
{
  return !str.empty()
         && std::find_if(
                str.begin(),
                str.end(),
                [](unsigned char c)
                {
                  return !std::isdigit(c);
                })
                == str.end();
}

ScAddr NumberUtils::resolveNumber(ScMemoryContext & context, unsigned const value)
{
  std::string valueStr = std::to_string(value);

  ScAddrSet const & links = context.SearchLinksByContent(valueStr);

  ScAddr numberNode;
  for (auto const & link : links)
  {
    ScIterator5Ptr nodesIterator = context.CreateIterator5(
        ScType::ConstNode, ScType::ConstCommonArc, link, ScType::ConstPermPosArc, Keynodes::nrel_idtf);

    if (nodesIterator->Next())
    {
      numberNode = nodesIterator->Get(0);
      break;
    }
  }

  if (!numberNode.IsValid())
  {
    numberNode = context.GenerateNode(ScType::ConstNode);
    ScAddr const & link = context.GenerateLink(ScType::ConstNodeLink);
    context.SetLinkContent(link, valueStr);
    ScAddr idtfRelationPair = context.GenerateConnector(ScType::ConstCommonArc, numberNode, link);
    context.GenerateConnector(ScType::ConstPermPosArc, Keynodes::nrel_idtf, idtfRelationPair);
  }

  return numberNode;
}

}  // namespace utils
