#include "utils/TemplateUtils.hpp"

#include <sc-agents-common/utils/IteratorUtils.hpp>

#include "keynodes/Keynodes.hpp"

namespace utils
{

void TemplateUtils::getConnectorTemplateKeyElements(
    ScMemoryContext & context,
    ScAddr const & connectorTemplateAddr,
    ConnectorTemplateKeyElements & elements)
{
  elements.connectorStartVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorTemplateAddr, Keynodes::GetRrelIndex(1));
  elements.connectorEndVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorTemplateAddr, Keynodes::GetRrelIndex(2));
  elements.connectorVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorTemplateAddr, Keynodes::GetRrelIndex(3));
}

void TemplateUtils::getWeightTemplateKeyElements(
    ScMemoryContext & context,
    ScAddr const & connectorWeightTemplateAddr,
    WeightTemplateKeyElements & elements)
{
  elements.measuredObjectVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorWeightTemplateAddr, Keynodes::GetRrelIndex(1));
  elements.numberVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorWeightTemplateAddr, Keynodes::GetRrelIndex(2));
}

}  // namespace utils
