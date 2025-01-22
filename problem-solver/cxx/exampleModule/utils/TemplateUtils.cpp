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

void TemplateUtils::getConnectorTemplateInfo(
    ScMemoryContext & context,
    ScAddr const & connectorTemplateAddr,
    ConnectorTemplateInfo & templateInfo)
{
  templateInfo.templateAddr = connectorTemplateAddr;
  templateInfo.connectorStartVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorTemplateAddr, Keynodes::GetRrelIndex(1));
  if (!templateInfo.connectorStartVariable.IsValid())
    SC_THROW_EXCEPTION(
        utils::ExceptionItemNotFound, "Incorrect connector template - connector start variable is not found.");
  templateInfo.connectorEndVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorTemplateAddr, Keynodes::GetRrelIndex(2));
  if (!templateInfo.connectorEndVariable.IsValid())
    SC_THROW_EXCEPTION(
        utils::ExceptionItemNotFound, "Incorrect connector template - connector end variable is not found.");
  templateInfo.connectorVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorTemplateAddr, Keynodes::GetRrelIndex(3));
  if (!templateInfo.connectorVariable.IsValid())
    SC_THROW_EXCEPTION(utils::ExceptionItemNotFound, "Incorrect connector template - connector variable is not found.");
}

void TemplateUtils::getWeightTemplateInfo(
    ScMemoryContext & context,
    ScAddr const & connectorWeightTemplateAddr,
    WeightTemplateInfo & templateInfo)
{
  templateInfo.templateAddr = connectorWeightTemplateAddr;
  templateInfo.measuredObjectVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorWeightTemplateAddr, Keynodes::GetRrelIndex(1));
  if (!templateInfo.measuredObjectVariable.IsValid())
    SC_THROW_EXCEPTION(
        utils::ExceptionItemNotFound, "Incorrect connector weight template - measured object is not found.");
  templateInfo.numberVariable =
      IteratorUtils::getAnyByOutRelation(&context, connectorWeightTemplateAddr, Keynodes::GetRrelIndex(2));
  if (!templateInfo.numberVariable.IsValid())
    SC_THROW_EXCEPTION(
        utils::ExceptionItemNotFound, "Incorrect connector weight template - number variable is not found.");
}

}  // namespace utils
