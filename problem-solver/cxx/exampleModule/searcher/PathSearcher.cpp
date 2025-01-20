/*
* This source file is part of an OSTIS project. For the latest info, see
* http://ostis.net Distributed under the MIT License (See accompanying file
* COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "PathSearcher.hpp"

#include "keynodes/Keynodes.hpp"
#include "utils/NumberUtils.hpp"

PathSearcher::PathSearcher(ScMemoryContext * context)
  : context(context)
{
}

void PathSearcher::findPath(
    ScAddr const & graph,
    ScAddr const & startNode,
    ScAddr const & endNode,
    ConnectorTemplateInfo const & connectorTemplateInfo,
    WeightTemplateInfo const & weightTemplateInfo,
    unsigned & pathLength,
    ScAddrVector & path) const
{
  ScAddrQueue vertexesToCheck;
  std::map<ScAddr, unsigned, ScAddrLessFunc> pathLengthToVertexes;
  std::map<ScAddr, ScAddrVector, ScAddrLessFunc> pathsToVertexes;

  vertexesToCheck.emplace(startNode);

  while (!vertexesToCheck.empty())
  {
    ScAddr const & currnetVertex = vertexesToCheck.front();
    vertexesToCheck.pop();

    ScAddrToValueUnorderedMap<unsigned> neighborsWithPathLength;
    getUnusedNeighborsWithConnectorInfo(
        graph, currnetVertex, connectorTemplateInfo, weightTemplateInfo, neighborsWithPathLength);

    for (auto const & neighborWithPathLength : neighborsWithPathLength)
    {
      ScAddr const & neighbor = neighborWithPathLength.first;
      unsigned const connectorWeight = neighborWithPathLength.second;

      if (pathLengthToVertexes.find(neighbor) == pathLengthToVertexes.cend())
      {
        pathLengthToVertexes[neighbor] = pathLengthToVertexes[currnetVertex] + connectorWeight;

        pathsToVertexes[neighbor] = pathsToVertexes[currnetVertex];
        pathsToVertexes[neighbor].emplace_back(neighbor);

        vertexesToCheck.emplace(neighbor);
      }
      else
      {
        unsigned newPathLength = pathLengthToVertexes[currnetVertex] + connectorWeight;
        if (newPathLength < pathLengthToVertexes[neighbor])
        {
          pathLengthToVertexes[neighbor] = newPathLength;

          pathsToVertexes[neighbor] = pathsToVertexes[currnetVertex];
          pathsToVertexes[neighbor].emplace_back(neighbor);

          vertexesToCheck.emplace(neighbor);
        }
      }
    }
  }

  if (pathLengthToVertexes.find(endNode) == pathLengthToVertexes.end())
    SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "Target vertex not reached");

  pathLength = pathLengthToVertexes[endNode];
  path.clear();
  path.emplace_back(startNode);
  path.insert(path.end(), pathsToVertexes[endNode].begin(), pathsToVertexes[endNode].end());
}

void PathSearcher::getUnusedNeighborsWithConnectorInfo(
    ScAddr const & graph,
    ScAddr const & startNode,
    ConnectorTemplateInfo const & connectorTemplateInfo,
    WeightTemplateInfo const & weightTemplateInfo,
    ScAddrToValueUnorderedMap<unsigned>  & neighborsWithConnectorInfo) const
{
  ScTemplateParams connectorTemplateParams;
  connectorTemplateParams.Add(connectorTemplateInfo.connectorStartVariable, startNode);
  ScTemplate connectorTemplate;
  context->BuildTemplate(connectorTemplate, connectorTemplateInfo.templateAddr, connectorTemplateParams);

  context->SearchByTemplate(
      connectorTemplate,
      [&](ScTemplateResultItem const & item)
      {
        ScAddr const & connector = item[connectorTemplateInfo.connectorVariable];

        ScAddr const & neighbor = item[connectorTemplateInfo.connectorEndVariable];
        unsigned const connectorWeight =
            getConnectorWeights(connector, weightTemplateInfo);

        neighborsWithConnectorInfo[neighbor] = connectorWeight;
      },
      [this, &graph](ScAddr const & elementAddr) -> bool
      {
        return context->CheckConnector(graph, elementAddr, ScType::ConstPermPosArc);
      });
}

unsigned PathSearcher::getConnectorWeights(
    ScAddr const & connector,
    WeightTemplateInfo const & weightTemplateInfo) const
{
  ScTemplateParams connectorWeightTemplateParams;
  connectorWeightTemplateParams.Add(weightTemplateInfo.measuredObjectVariable, connector);
  ScTemplate connectorWeightTemplate;
  context->BuildTemplate(connectorWeightTemplate, weightTemplateInfo.templateAddr, connectorWeightTemplateParams);

  unsigned weight;
  bool isFound = false;
  context->SearchByTemplateInterruptibly(
      connectorWeightTemplate,
      [this, &isFound, &weightTemplateInfo, &weight](
          ScTemplateResultItem const & item) -> ScTemplateSearchRequest
      {
        isFound = true;

        weight = getNumberValue(item[weightTemplateInfo.numberVariable]);

        return ScTemplateSearchRequest::STOP;
      });

  if (!isFound)
    SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "Connector weight is not found");

  return weight;
}

unsigned PathSearcher::getNumberValue(ScAddr const & number) const
{
  ScIterator5Ptr idtfsIterator = context->CreateIterator5(
      number, ScType::ConstCommonArc, ScType::ConstNodeLink, ScType::ConstPermPosArc, Keynodes::nrel_idtf);
  while (idtfsIterator->Next())
  {
    ScAddr const & idtfLink = idtfsIterator->Get(2);
    std::string idtfString;
    context->GetLinkContent(idtfLink, idtfString);
    if (utils::NumberUtils::isNumber(idtfString))
      return atoi(idtfString.c_str());
  }

  SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "Connector weight value is not found");
}
