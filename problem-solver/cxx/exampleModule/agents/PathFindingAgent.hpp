/*
 * This source file is part of an OSTIS project. For the latest info, see
 * http://ostis.net Distributed under the MIT License (See accompanying file
 * COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#pragma once

#include <sc-memory/sc_agent.hpp>

#include "keynodes/Keynodes.hpp"
#include "structures/ConnectorTemplateKeyElements.hpp"
#include "structures/WeightTemplateKeyElements.hpp"

class PathFindingAgent : public ScActionInitiatedAgent
{
public:
  ScAddr GetActionClass() const;

  ScResult DoProgram(ScAction & action);

private:
  ScStructure formResult(
      ScAddrVector const & path,
      unsigned pathLength,
      ScAddr const & connectorTemplateAddr,
      ConnectorTemplateKeyElements const & connectorTemplateKeyElements,
      ScAddr const & connectorWeightTemplateAddr,
      WeightTemplateKeyElements const & weightTemplateKeyElements);

  void addConnectionIntoStructure(
      ScAddr const & first,
      ScAddr const & second,
      ScAddr const & connectorTemplateAddr,
      ConnectorTemplateKeyElements const & connectorTemplateKeyElements,
      ScStructure & structure);

  void addPathWeightIntoStrucutre(
      ScAddr const & pathAddr,
      ScAddr const & connectorWeightTemplateAddr,
      WeightTemplateKeyElements const & weightTemplateKeyElements,
      unsigned const length,
      ScStructure & structure);
};
