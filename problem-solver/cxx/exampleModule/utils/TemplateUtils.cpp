/*
* This source file is part of an OSTIS project. For the latest info, see
* http://ostis.net Distributed under the MIT License (See accompanying file
* COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

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
  if(!elements.connectorStartVariable.IsValid())
    SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "Incorrect connector template - connector start variable is not found.");
  elements.connectorEndVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorTemplateAddr, Keynodes::GetRrelIndex(2));
  if(!elements.connectorEndVariable.IsValid())
    SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "Incorrect connector template - connector end variable is not found.");
  elements.connectorVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorTemplateAddr, Keynodes::GetRrelIndex(3));
  if(!elements.connectorVariable.IsValid())
    SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "Incorrect connector template - connector variable is not found.");
}

void TemplateUtils::getWeightTemplateKeyElements(
    ScMemoryContext & context,
    ScAddr const & connectorWeightTemplateAddr,
    WeightTemplateKeyElements & elements)
{
  elements.measuredObjectVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorWeightTemplateAddr, Keynodes::GetRrelIndex(1));
  if(!elements.measuredObjectVariable.IsValid())
    SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "Incorrect connector weight template - measured object is not found.");
  elements.numberVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorWeightTemplateAddr, Keynodes::GetRrelIndex(2));
  if(!elements.numberVariable.IsValid())
    SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "Incorrect connector weight template - number variable is not found.");
}

}  // namespace utils
