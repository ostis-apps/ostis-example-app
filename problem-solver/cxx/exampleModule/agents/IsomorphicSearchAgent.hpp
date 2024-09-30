/*
 * This source file is part of an OSTIS project. For the latest info, see
 * http://ostis.net Distributed under the MIT License (See accompanying file
 * COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#pragma once

#include <sc-memory/sc_agent.hpp>

#include "keynodes/keynodes.hpp"

class IsomorphicSearchAgent : public ScActionInitiatedAgent
{
public:
  ScAddr GetActionClass() const;

  ScResult DoProgram(ScAction & action);

  void formSearchResults(ScAddr const & scTemplateNode, ScAddrVector & answerElements);

  void clearPreviousSearchResults(ScAddr const & scTemplate);

  ScAddr formNewResultsSetConstruction(ScAddr const & scTemplate, ScAddrVector & answerElements);

  ScAddr emplaceItemElementsInStructure(ScTemplateSearchResultItem const & item);
};
