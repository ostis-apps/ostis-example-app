#include "TestUtils.hpp"

#include <gtest/gtest.h>

#include "keynodes/Keynodes.hpp"

namespace utils
{

void TestUtils::getSoleIdtf(
    ScMemoryContext & context, ScAddr const & element, std::string & idtf)
{
  ScIterator5Ptr idtfIterator = context.CreateIterator5(
      element, ScType::ConstCommonArc, ScType::ConstNodeLink, ScType::ConstPermPosArc, Keynodes::nrel_idtf);
  ScAddr idtfLink;
  if (idtfIterator->Next())
    idtfLink = idtfIterator->Get(2);
  else
    FAIL();

  ASSERT_FALSE(idtfIterator->Next());

  ASSERT_TRUE(context.GetLinkContent(idtfLink, idtf));
}

//context.GetElementEdgesAndIncomingArcsCount does not filter common arcs
unsigned TestUtils::getAmountOfOutgoingMembershipArcs(
    ScMemoryContext & context, ScAddr const & element)
{
  unsigned outgoingArcsAmount = 0;
  ScIterator3Ptr outgoingArcsIterator = context.CreateIterator3(
      element, ScType::ConstPermPosArc, ScType::Unknown);
  while (outgoingArcsIterator->Next())
    outgoingArcsAmount++;

  return outgoingArcsAmount;
}

}  // namespace utils
