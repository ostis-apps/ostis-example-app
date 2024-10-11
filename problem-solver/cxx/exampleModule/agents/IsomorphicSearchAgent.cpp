/*
 * This source file is part of an OSTIS project. For the latest info, see
 * http://ostis.net Distributed under the MIT License (See accompanying file
 * COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#include "IsomorphicSearchAgent.hpp"

#include <iostream>

#include <sc-memory/sc_memory.hpp>
#include <sc-memory/sc_stream.hpp>

#include <sc-agents-common/utils/IteratorUtils.hpp>

using namespace std;
using namespace utils;

ScAddr IsomorphicSearchAgent::GetActionClass() const
{
  return Keynodes::action_search_isomorphic_structures;
}

ScResult IsomorphicSearchAgent::DoProgram(ScAction & action)
{
  auto const & [scTemplateNode] = action.GetArguments<1>();

  if (!scTemplateNode.IsValid())
  {
    SC_AGENT_LOG_ERROR("Template argument is not found");
    return action.FinishWithError();
  }

  ScStructure result = m_context.GenerateStructure();
  try
  {
    formSearchResults(scTemplateNode, result);
  }
  catch (ScException const & exception)
  {
    SC_AGENT_LOG_ERROR(exception.Message());
    return action.FinishWithError();
  }

  action.SetResult(result);
  return action.FinishSuccessfully();
}

void IsomorphicSearchAgent::formSearchResults(ScAddr const & scTemplateNode, ScStructure & result)
{
  clearPreviousSearchResults(scTemplateNode);

  ScTemplate scTemplate;
  m_context.BuildTemplate(scTemplate, scTemplateNode);

  ScAddr const & resultsSet = formNewResultsSetConstruction(scTemplateNode, result);

  ScAddrVector searchResults;
  m_context.SearchByTemplate(scTemplate, [&searchResults, this](ScTemplateSearchResultItem const & item) {
    searchResults.push_back(emplaceItemElementsInStructure(item));
  });

  if (searchResults.empty())
  {
    ScAddr const & accessArc = m_context.GenerateConnector(ScType::EdgeAccessConstPosPerm, Keynodes::empty_set, resultsSet);
    result << accessArc << Keynodes::empty_set;
    SC_AGENT_LOG_DEBUG("Structures have not been found");
  }
  else
  {
    for (auto const & resultAddr : searchResults)
    {
      ScAddr const & accessArc = m_context.GenerateConnector(ScType::EdgeAccessConstPosPerm, resultsSet, result);
      result << accessArc << resultAddr;
    }
    SC_AGENT_LOG_DEBUG("Structures have been found");
  }
}

void IsomorphicSearchAgent::clearPreviousSearchResults(ScAddr const & scTemplateNode)
{
  ScIterator5Ptr previousResultsStructuresSetsIterator = m_context.CreateIterator5(
      scTemplateNode,
      ScType::EdgeDCommonConst,
      ScType::NodeConst,
      ScType::EdgeAccessConstPosPerm,
      Keynodes::nrel_search_result);
  while (previousResultsStructuresSetsIterator->Next())
  {
    ScIterator3Ptr previousResultsSetElementsIterator = m_context.CreateIterator3(
        previousResultsStructuresSetsIterator->Get(2), ScType::EdgeAccessConstPosPerm, ScType::NodeConstStruct);
    while (previousResultsSetElementsIterator->Next())
      m_context.EraseElement(previousResultsSetElementsIterator->Get(2));

    m_context.EraseElement(previousResultsStructuresSetsIterator->Get(1));
    m_context.EraseElement(previousResultsStructuresSetsIterator->Get(2));
  }
}

ScAddr IsomorphicSearchAgent::formNewResultsSetConstruction(
    ScAddr const & scTemplateNode,
    ScStructure & result)
{
  ScAddr const & resultsSetTuple = m_context.GenerateNode(ScType::NodeConstTuple);
  ScAddr const & searchResultRelationPair =
      m_context.GenerateConnector(ScType::EdgeDCommonConst, scTemplateNode, resultsSetTuple);
  ScAddr const & relationAccessArc =
      m_context.GenerateConnector(ScType::EdgeAccessConstPosPerm, Keynodes::nrel_search_result, searchResultRelationPair);

  result << resultsSetTuple << searchResultRelationPair << relationAccessArc;
  return resultsSetTuple;
}

ScAddr IsomorphicSearchAgent::emplaceItemElementsInStructure(ScTemplateSearchResultItem const & item)
{
  ScAddr const & searchResultStructure = m_context.GenerateNode(ScType::NodeConstStruct);

  size_t const searchResultItemSize = item.Size();
  for (size_t elementIndex = 0; elementIndex < searchResultItemSize; elementIndex++)
    m_context.GenerateConnector(ScType::EdgeAccessConstPosPerm, searchResultStructure, item[elementIndex]);

  return searchResultStructure;
}
