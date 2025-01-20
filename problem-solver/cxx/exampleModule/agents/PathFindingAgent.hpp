/*
 * This source file is part of an OSTIS project. For the latest info, see
 * http://ostis.net Distributed under the MIT License (See accompanying file
 * COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#pragma once

#include <sc-memory/sc_agent.hpp>

#include "keynodes/Keynodes.hpp"
#include "structures/ConnectorTemplateInfo.hpp"
#include "structures/WeightTemplateInfo.hpp"

class PathFindingAgent : public ScActionInitiatedAgent
{
public:
  ScAddr GetActionClass() const;

  ScResult DoProgram(ScAction & action);

private:
  ScStructure formResult(
      ScAddrVector const & path,
      unsigned pathLength,
      ConnectorTemplateInfo const & connectorTemplateInfo,
      WeightTemplateInfo const & weightTemplateInfo);

  void addConnectionIntoStructure(
      ScAddr const & first,
      ScAddr const & second,
      ConnectorTemplateInfo const & connectorTemplateInfo,
      ScStructure & structure);

  void addPathWeightIntoStrucutre(
      ScAddr const & pathAddr,
      WeightTemplateInfo const & weightTemplateInfo,
      unsigned const length,
      ScStructure & structure);
};
