#include <iostream>

#include <sc-memory/sc_memory.hpp>
#include <sc-memory/sc_stream.hpp>
#include <sc-memory/sc_template_search.cpp>

#include <sc-agents-common/utils/IteratorUtils.hpp>
#include <sc-agents-common/utils/AgentUtils.hpp>

#include "IsomorphicSearchAgent.hpp"

using namespace std;
using namespace utils;

namespace exampleModule
{
SC_AGENT_IMPLEMENTATION(IsomorphicSearchAgent)
{
  SC_LOG_DEBUG("IsomorphicSearchAgent: started");
  ScAddr actionNode = otherAddr;

  ScAddr scTemplateNode = IteratorUtils::getAnyFromSet(ms_context.get(), actionNode);

  if (!scTemplateNode.IsValid())
  {
    SC_LOG_ERROR("IsomorphicSearchAgent: template argument is not found");
    utils::AgentUtils::finishAgentWork(&m_memoryCtx, actionNode, false);
    return SC_RESULT_ERROR_INVALID_PARAMS;
  }

  ScAddrVector answerElements;
  try
  {
    formSearchResults(scTemplateNode, answerElements);
  }
  catch (exception & exc)
  {
    SC_LOG_ERROR("IsomorphicSearchAgent: " << exc.what());
    utils::AgentUtils::finishAgentWork(&m_memoryCtx, actionNode, false);
    return SC_RESULT_ERROR;
  }

  utils::AgentUtils::finishAgentWork(ms_context.get(), actionNode, answerElements, true);
  SC_LOG_DEBUG("IsomorphicSearchAgent: finished");
  return SC_RESULT_OK;
}

void IsomorphicSearchAgent::formSearchResults(ScAddr const & scTemplateNode, ScAddrVector & answerElements)
{
  clearPreviousSearchResults(scTemplateNode);

  ScTemplate scTemplate;
  ms_context->HelperBuildTemplate(scTemplate, scTemplateNode);

  ScAddr const & resultsSet = formNewResultsSetConstruction(scTemplateNode, answerElements);

  ScAddrVector searchResults;
  ms_context->HelperSearchTemplate(scTemplate, [&searchResults, this](ScTemplateSearchResultItem const & item) {
    searchResults.push_back(emplaceItemElementsInStructure(item));
  });

  if (searchResults.empty())
  {
    ScAddr const & accessArc = m_memoryCtx.CreateEdge(ScType::EdgeAccessConstPosPerm, Keynodes::empty_set, resultsSet);
    answerElements.insert(answerElements.end(), {accessArc, Keynodes::empty_set});
    SC_LOG_DEBUG("IsomorphicSearchAgent: structures have not been found");
  }
  else
  {
    for (auto const & result : searchResults)
    {
      ScAddr const & accessArc = m_memoryCtx.CreateEdge(ScType::EdgeAccessConstPosPerm, resultsSet, result);
      answerElements.insert(answerElements.end(), {accessArc, result});
    }
    SC_LOG_DEBUG("IsomorphicSearchAgent: structures have been found");
  }
}

void IsomorphicSearchAgent::clearPreviousSearchResults(ScAddr const & scTemplateNode)
{
  ScIterator5Ptr previousResultsStructuresSetsIterator = m_memoryCtx.Iterator5(
      scTemplateNode,
      ScType::EdgeDCommonConst,
      ScType::NodeConst,
      ScType::EdgeAccessConstPosPerm,
      Keynodes::nrel_search_result);
  while (previousResultsStructuresSetsIterator->Next())
  {
    ScIterator3Ptr previousResultsSetElementsIterator = m_memoryCtx.Iterator3(
        previousResultsStructuresSetsIterator->Get(2), ScType::EdgeAccessConstPosPerm, ScType::NodeConstStruct);
    while (previousResultsSetElementsIterator->Next())
      m_memoryCtx.EraseElement(previousResultsSetElementsIterator->Get(2));

    m_memoryCtx.EraseElement(previousResultsStructuresSetsIterator->Get(1));
    m_memoryCtx.EraseElement(previousResultsStructuresSetsIterator->Get(2));
  }
}

ScAddr IsomorphicSearchAgent::formNewResultsSetConstruction(
    ScAddr const & scTemplateNode,
    ScAddrVector & answerElements)
{
  ScAddr const & resultsSetTuple = m_memoryCtx.CreateNode(ScType::NodeConstTuple);
  ScAddr const & searchResultRelationPair =
      m_memoryCtx.CreateEdge(ScType::EdgeDCommonConst, scTemplateNode, resultsSetTuple);
  ScAddr const & relationAccessArc =
      m_memoryCtx.CreateEdge(ScType::EdgeAccessConstPosPerm, Keynodes::nrel_search_result, searchResultRelationPair);

  answerElements.insert(answerElements.end(), {resultsSetTuple, searchResultRelationPair, relationAccessArc});

  return resultsSetTuple;
}

ScAddr IsomorphicSearchAgent::emplaceItemElementsInStructure(ScTemplateSearchResultItem const & item)
{
  ScAddr const & searchResultStructure = m_memoryCtx.CreateNode(ScType::NodeConstStruct);

  size_t const searchResultItemSize = item.Size();
  for (size_t elementIndex = 0; elementIndex < searchResultItemSize; elementIndex++)
    m_memoryCtx.CreateEdge(ScType::EdgeAccessConstPosPerm, searchResultStructure, item[elementIndex]);

  return searchResultStructure;
}

}  // namespace exampleModule
