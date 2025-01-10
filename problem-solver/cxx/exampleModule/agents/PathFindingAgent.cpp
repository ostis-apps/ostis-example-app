/*
 * This source file is part of an OSTIS project. For the latest info, see
 * http://ostis.net Distributed under the MIT License (See accompanying file
 * COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#include "PathFindingAgent.hpp"

#include <sc-memory/sc_memory.hpp>
#include <sc-memory/sc_stream.hpp>

#include "searcher/PathSearcher.hpp"
#include "utils/TemplateUtils.hpp"
#include "utils/NumberUtils.hpp"

using namespace std;
using namespace utils;

ScAddr PathFindingAgent::GetActionClass() const
{
  return Keynodes::action_find_minimum_path;
}

ScResult PathFindingAgent::DoProgram(ScAction & action)
{
  auto const & [graph, startNode, endNode, connectorTemplateAddr, connectorWeightTemplateAddr] =
      action.GetArguments<5>();

  if (!graph.IsValid())
  {
    SC_AGENT_LOG_ERROR("Graph argument is not found");
    return action.FinishWithError();
  }

  if (!startNode.IsValid())
  {
    SC_AGENT_LOG_ERROR("Start node argument is not found");
    return action.FinishWithError();
  }

  if (!endNode.IsValid())
  {
    SC_AGENT_LOG_ERROR("End node argument is not found");
    return action.FinishWithError();
  }

  if (!connectorTemplateAddr.IsValid())
  {
    SC_AGENT_LOG_ERROR("Connector template argument is not found");
    return action.FinishWithError();
  }

  if (!connectorWeightTemplateAddr.IsValid())
  {
    SC_AGENT_LOG_ERROR("Connector weight template  argument is not found");
    return action.FinishWithError();
  }

  try
  {
    ConnectorTemplateKeyElements connectorTemplateKeyElements;
    utils::TemplateUtils::getConnectorTemplateKeyElements(
        m_context, connectorTemplateAddr, connectorTemplateKeyElements);

    WeightTemplateKeyElements weightTemplateKeyElements;
    utils::TemplateUtils::getWeightTemplateKeyElements(
        m_context, connectorWeightTemplateAddr, weightTemplateKeyElements);

    unsigned pathLength;
    ScAddrVector path;

    PathSearcher searcher(&m_context);
    searcher.findPath(
        graph,
        startNode,
        endNode,
        connectorTemplateAddr,
        connectorTemplateKeyElements,
        connectorWeightTemplateAddr,
        weightTemplateKeyElements,
        pathLength,
        path);

    ScStructure const & result = formResult(
        path,
        pathLength,
        connectorTemplateAddr,
        connectorTemplateKeyElements,
        connectorWeightTemplateAddr,
        weightTemplateKeyElements);
    action.SetResult(result);
  }
  catch (ScException const & exception)
  {
    SC_AGENT_LOG_ERROR(exception.Message());
    return action.FinishWithError();
  }

  return action.FinishSuccessfully();
}

ScStructure PathFindingAgent::formResult(
    ScAddrVector const & path,
    unsigned pathLength,
    ScAddr const & connectorTemplateAddr,
    ConnectorTemplateKeyElements const & connectorTemplateKeyElements,
    ScAddr const & connectorWeightTemplateAddr,
    WeightTemplateKeyElements const & weightTemplateKeyElements)
{
  ScAddr const & resultStructureAddr = m_context.GenerateNode(ScType::ConstNode);
  ScStructure resultStructure = m_context.ConvertToStructure(resultStructureAddr);

  ScAddr const & pathStructureAddr = m_context.GenerateNode(ScType::ConstNode);
  ScStructure pathStructure = m_context.ConvertToStructure(pathStructureAddr);

  for (auto it = path.begin() + 1; it != path.end(); ++it)
  {
    ScAddr const & first = *(it - 1);
    ScAddr const & second = *it;

    addConnectionIntoStructure(first, second, connectorTemplateAddr, connectorTemplateKeyElements, pathStructure);
  }

  addPathWeightIntoStrucutre(
      pathStructure, connectorWeightTemplateAddr, weightTemplateKeyElements, pathLength, resultStructure);

  return resultStructure;
}

void PathFindingAgent::addConnectionIntoStructure(
    ScAddr const & first,
    ScAddr const & second,
    ScAddr const & connectorTemplateAddr,
    ConnectorTemplateKeyElements const & connectorTemplateKeyElements,
    ScStructure & structure)
{
  ScTemplateParams connectorTemplateParams;
  connectorTemplateParams.Add(connectorTemplateKeyElements.connectorStartVariable, first);
  connectorTemplateParams.Add(connectorTemplateKeyElements.connectorEndVariable, second);

  ScTemplate connectorTemplate;
  m_context.BuildTemplate(connectorTemplate, connectorTemplateAddr, connectorTemplateParams);

  bool isFound = false;

  m_context.SearchByTemplateInterruptibly(
      connectorTemplate,
      [&isFound, &structure](ScTemplateResultItem const & item) -> ScTemplateSearchRequest
      {
        isFound = true;

        for (auto const & element : item)
          structure.Append(element);

        return ScTemplateSearchRequest::STOP;
      });

  if (!isFound)
    SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "PathFindingAgent: result creation failed");
}

void PathFindingAgent::addPathWeightIntoStrucutre(
    ScAddr const & pathAddr,
    ScAddr const & connectorWeightTemplateAddr,
    WeightTemplateKeyElements const & weightTemplateKeyElements,
    unsigned const length,
    ScStructure & structure)
{
  ScAddr const & numberAddr = utils::NumberUtils::resolveNumber(m_context, length);

  ScTemplateParams connectorTemplateParams;
  connectorTemplateParams.Add(weightTemplateKeyElements.measuredObjectVariable, pathAddr);
  connectorTemplateParams.Add(weightTemplateKeyElements.numberVariable, numberAddr);

  ScTemplate connectorWeightTemplate;
  m_context.BuildTemplate(connectorWeightTemplate, connectorWeightTemplateAddr, connectorTemplateParams);
  ScTemplateGenResult genResult;
  m_context.GenerateByTemplate(connectorWeightTemplate, genResult);

  for (auto const & element : genResult)
    structure.Append(element);
}
