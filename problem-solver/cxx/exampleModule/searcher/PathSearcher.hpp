/*
* This source file is part of an OSTIS project. For the latest info, see
* http://ostis.net Distributed under the MIT License (See accompanying file
* COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#pragma once

#include "sc-memory/sc_memory.hpp"

#include "structures/ConnectorTemplateKeyElements.hpp"
#include "structures/WeightTemplateKeyElements.hpp"

class PathSearcher
{
public:
  explicit PathSearcher(ScMemoryContext * context);

  void findPath(
      ScAddr const & graph,
      ScAddr const & startNode,
      ScAddr const & endNode,
      ScAddr const & connectorTemplateAddr,
      ConnectorTemplateKeyElements const & connectorTemplateKeyElements,
      ScAddr const & connectorWeightTemplateAddr,
      WeightTemplateKeyElements const & weightTemplateKeyElements,
      unsigned & pathLength,
      ScAddrVector & path);

private:
  ScMemoryContext * context;

  ScAddrToValueUnorderedMap<ScAddr> getNeighborsWithConnectors(
      ScAddr const & graph,
      ScAddr const & startNode,
      ScAddr const & connectorTemplateAddr,
      ConnectorTemplateKeyElements const & connectorTemplateKeyElements);

  unsigned getConnectorWeights(
      ScAddr const & connector,
      ScAddr const & connectorWeightTemplateAddr,
      WeightTemplateKeyElements const & weightTemplateKeyElements);

  unsigned getNumberValue(ScAddr const & number);
};
