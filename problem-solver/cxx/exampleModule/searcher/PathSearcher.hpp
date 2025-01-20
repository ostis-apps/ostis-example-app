/*
 * This source file is part of an OSTIS project. For the latest info, see
 * http://ostis.net Distributed under the MIT License (See accompanying file
 * COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#pragma once

#include "sc-memory/sc_memory.hpp"

#include "templateInformationStructures/ConnectorTemplateInfo.hpp"
#include "templateInformationStructures/WeightTemplateInfo.hpp"

class PathSearcher
{
public:
  explicit PathSearcher(ScMemoryContext * context);

  void findPath(
      ScAddr const & graph,
      ScAddr const & startNode,
      ScAddr const & endNode,
      ConnectorTemplateInfo const & connectorTemplateInfo,
      WeightTemplateInfo const & weightTemplateInfo,
      unsigned & pathLength,
      ScAddrVector & path) const;

private:
  ScMemoryContext * context;

  void getUnusedNeighborsWithConnectorInfo(
      ScAddr const & graph,
      ScAddr const & startNode,
      ConnectorTemplateInfo const & connectorTemplateInfo,
      WeightTemplateInfo const & weightTemplateInfo,
      ScAddrToValueUnorderedMap<unsigned> & neighborsWithConnectorInfo) const;

  unsigned getConnectorWeight(ScAddr const & connector, WeightTemplateInfo const & weightTemplateInfo) const;

  unsigned getNumberValue(ScAddr const & number) const;
};
