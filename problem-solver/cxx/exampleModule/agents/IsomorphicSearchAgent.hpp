#pragma once

#include <sc-memory/sc_agent.hpp>

namespace exampleModule
{
class IsomorphicSearchAgent : public ScActionInitiatedAgent
{
public:
  ScAddr GetActionClass() const override;

  ScResult DoProgram(ScAction & action) override;

  void formSearchResults(ScAddr const & scTemplateNode, ScStructure & result);

  void clearPreviousSearchResults(ScAddr const & scTemplate);

  ScAddr formNewResultsSetConstruction(ScAddr const & scTemplate, ScStructure & result);

  ScAddr emplaceItemElementsInStructure(ScTemplateSearchResultItem const & item);
};

}  // namespace exampleModule
