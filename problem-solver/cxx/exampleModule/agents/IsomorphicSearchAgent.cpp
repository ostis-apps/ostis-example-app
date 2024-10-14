#include "IsomorphicSearchAgent.hpp"

#include "keynodes/keynodes.hpp"

#include <sc-agents-common/utils/IteratorUtils.hpp>

using namespace utils;

namespace exampleModule
{
ScResult IsomorphicSearchAgent::DoProgram(ScAction & action)
{
  ScAddr scTemplateNode = IteratorUtils::getAnyFromSet(&m_context, action);

  if (!scTemplateNode.IsValid())
  {
    SC_AGENT_LOG_ERROR("template argument is not found");
    return action.FinishUnsuccessfully();
  }

  ScStructure result = m_context.GenerateStructure();
  try
  {
    formSearchResults(scTemplateNode, result);
  }
  catch (std::exception & exc)
  {
    SC_AGENT_LOG_ERROR(exc.what());
    return action.FinishUnsuccessfully();
  }

  action.SetResult(result);
  return action.FinishSuccessfully();
}

ScAddr IsomorphicSearchAgent::GetActionClass() const
{
  return Keynodes::action_find_isomorphic_structures;
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
    ScAddr const & accessArc = m_context.GenerateConnector(ScType::ConstPermPosArc, Keynodes::empty_set, resultsSet);
    result << accessArc << Keynodes::empty_set;
    SC_AGENT_LOG_DEBUG("structures have not been found");
  }
  else
  {
    for (auto const & searchResult : searchResults)
    {
      ScAddr const & accessArc = m_context.GenerateConnector(ScType::ConstPermPosArc, resultsSet, searchResult);
      result << accessArc << searchResult;
    }
    SC_AGENT_LOG_DEBUG("structures have been found");
  }
}

void IsomorphicSearchAgent::clearPreviousSearchResults(ScAddr const & scTemplateNode)
{
  ScIterator5Ptr previousResultsStructuresSetsIterator = m_context.CreateIterator5(
      scTemplateNode,
      ScType::ConstCommonArc,
      ScType::ConstNode,
      ScType::ConstPermPosArc,
      Keynodes::nrel_search_result);
  while (previousResultsStructuresSetsIterator->Next())
  {
    ScIterator3Ptr previousResultsSetElementsIterator = m_context.CreateIterator3(
        previousResultsStructuresSetsIterator->Get(2), ScType::ConstPermPosArc, ScType::ConstNodeStructure);
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
  ScAddr const & resultsSetTuple = m_context.GenerateNode(ScType::ConstNodeTuple);
  ScAddr const & searchResultRelationPair =
      m_context.GenerateConnector(ScType::ConstCommonArc, scTemplateNode, resultsSetTuple);
  ScAddr const & relationAccessArc =
      m_context.GenerateConnector(ScType::ConstPermPosArc, Keynodes::nrel_search_result, searchResultRelationPair);

  result << resultsSetTuple << searchResultRelationPair << relationAccessArc;

  return resultsSetTuple;
}

ScAddr IsomorphicSearchAgent::emplaceItemElementsInStructure(ScTemplateSearchResultItem const & item)
{
  ScAddr const & searchResultStructure = m_context.GenerateNode(ScType::ConstNodeStructure);

  size_t const searchResultItemSize = item.Size();
  for (size_t elementIndex = 0; elementIndex < searchResultItemSize; elementIndex++)
    m_context.GenerateConnector(ScType::ConstPermPosArc, searchResultStructure, item[elementIndex]);

  return searchResultStructure;
}

}  // namespace exampleModule
