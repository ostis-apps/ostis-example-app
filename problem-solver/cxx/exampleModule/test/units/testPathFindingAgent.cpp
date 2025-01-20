/*
 * This source file is part of an OSTIS project. For the latest info, see http://ostis.net
 * Distributed under the MIT License
 * (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
 */

#include <sc-memory/test/sc_test.hpp>
#include <sc-builder/scs_loader.hpp>

#include <sc-agents-common/utils/IteratorUtils.hpp>

#include "agents/PathFindingAgent.hpp"
#include "utils/NumberUtils.hpp"

#include "utils/TestUtils.hpp"

namespace pathFindingAgentTest
{
ScsLoader loader;
std::string const EXAMPLE_MODULE_TEST_FILES_DIR_PATH = EXAMPLE_MODULE_TEST_SRC_PATH "/testStructures/";
int const WAIT_TIME = 5000;

using PathFindingAgentTest = ScMemoryTest;

void checkResultAndGetPathWithLength(
    ScMemoryContext & context,
    ScAddr const & result,
    ScAddr const & weightTemplateAddr,
    unsigned expectedAmountOfElements,
    unsigned & length,
    ScAddr & pathAddr)
{
  ScAddr const & pathVariable =
      utils::IteratorUtils::getAnyByOutRelation(&context, weightTemplateAddr, Keynodes::rrel_1);
  ASSERT_TRUE(pathVariable.IsValid());
  ScAddr const & lengthNumberVariable =
      utils::IteratorUtils::getAnyByOutRelation(&context, weightTemplateAddr, Keynodes::rrel_2);
  ASSERT_TRUE(lengthNumberVariable.IsValid());

  ScTemplate weightTemplate;
  context.BuildTemplate(weightTemplate, weightTemplateAddr);
  unsigned amountOfResults = 0;
  ScAddr lengthNumberAddr;
  context.SearchByTemplateInterruptibly(
      weightTemplate,
      [&](ScTemplateResultItem const & item)
      {
        pathAddr = item[pathVariable];
        lengthNumberAddr = item[lengthNumberVariable];

        amountOfResults++;

        if (amountOfResults >= 2)
          return ScTemplateSearchRequest::STOP;

        return ScTemplateSearchRequest::CONTINUE;
      },
      [&context, &result](ScAddr const & elementAddr) -> bool
      {
        return context.CheckConnector(result, elementAddr, ScType::ConstPermPosArc);
      });
  ASSERT_EQ(amountOfResults, 1);

  ASSERT_EQ(utils::TestUtils::getAmountOfOutgoingMembershipArcs(context, result), expectedAmountOfElements);

  std::string lengthNumberIdtf;
  utils::TestUtils::getSoleIdtf(context, lengthNumberAddr, lengthNumberIdtf);

  ASSERT_TRUE(utils::NumberUtils::isPositiveInteger(lengthNumberIdtf));

  length = atoi(lengthNumberIdtf.c_str());
}

void checkPathStructure(
    ScMemoryContext & context,
    ScAddr const & pathAddr,
    ScAddr const & pathTemplateAddr,
    unsigned expectedAmountOfElements)
{
  ScTemplate pathTemplate;
  context.BuildTemplate(pathTemplate, pathTemplateAddr);

  unsigned amountOfResults = 0;
  context.SearchByTemplateInterruptibly(
      pathTemplate,
      [&](ScTemplateResultItem const & item)
      {
        amountOfResults++;

        if (amountOfResults >= 2)
          return ScTemplateSearchRequest::STOP;

        return ScTemplateSearchRequest::CONTINUE;
      },
      [&context, &pathAddr](ScAddr const & elementAddr) -> bool
      {
        return context.CheckConnector(pathAddr, elementAddr, ScType::ConstPermPosArc);
      });
  ASSERT_EQ(amountOfResults, 1);

  ASSERT_EQ(utils::TestUtils::getAmountOfOutgoingMembershipArcs(context, pathAddr), expectedAmountOfElements);
}

void successfulPathfindingTestBody(
    ScAgentContext & context,
    std::string const & fileWithGraphName,
    std::string const & expectedPathTemplateIdtf,
    unsigned expectedPathLength)
{
  loader.loadScsFile(context, EXAMPLE_MODULE_TEST_FILES_DIR_PATH + fileWithGraphName);
  loader.loadScsFile(context, EXAMPLE_MODULE_TEST_FILES_DIR_PATH + "templates.scs");
  loader.loadScsFile(context, EXAMPLE_MODULE_TEST_FILES_DIR_PATH + "testAction.scs");
  loader.loadScsFile(context, EXAMPLE_MODULE_TEST_FILES_DIR_PATH + "checkTemplates.scs");

  ScAddr testActionNode = context.SearchElementBySystemIdentifier("test_action");
  ASSERT_TRUE(testActionNode.IsValid());
  ScAction testAction = context.ConvertToAction(testActionNode);
  ASSERT_TRUE(testAction.InitiateAndWait(WAIT_TIME));
  ASSERT_TRUE(testAction.IsFinishedSuccessfully());

  ScStructure const & result = testAction.GetResult();

  ScAddr roadWeightTemplate = context.SearchElementBySystemIdentifier("road_weight_template");
  ASSERT_TRUE(roadWeightTemplate.IsValid());

  unsigned pathLength;
  ScAddr pathAddr;
  unsigned expectedAmountOfElementsInResult = 11;
  checkResultAndGetPathWithLength(
      context, result, roadWeightTemplate, expectedAmountOfElementsInResult, pathLength, pathAddr);
  ASSERT_EQ(pathLength, expectedPathLength);

  ScAddr pathCheckTemplateAddr = context.SearchElementBySystemIdentifier(expectedPathTemplateIdtf);
  ASSERT_TRUE(pathCheckTemplateAddr.IsValid());

  // unlike the roadWeightTemplate above, this check template doesn't have duplicating membership arcs
  unsigned expectedAmountOfElementsInPath =
      utils::TestUtils::getAmountOfOutgoingMembershipArcs(context, pathCheckTemplateAddr);
  checkPathStructure(context, pathAddr, pathCheckTemplateAddr, expectedAmountOfElementsInPath);
}

void initialize(ScAgentContext & context)
{
  context.SubscribeAgent<PathFindingAgent>();
}

void shutdown(ScAgentContext & context)
{
  context.UnsubscribeAgent<PathFindingAgent>();
}

TEST_F(PathFindingAgentTest, shortestPathByStepsIsShortestBySteps)
{
  ScAgentContext & context = *m_ctx;

  initialize(context);
  successfulPathfindingTestBody(context, "graphWithTwoStepsShortestPath.scs", "two_step_path_template", 450);
  shutdown(context);
}

TEST_F(PathFindingAgentTest, shortestPathByStepsIsNotShortestBySteps)
{
  ScAgentContext & context = *m_ctx;

  initialize(context);
  successfulPathfindingTestBody(context, "graphWithThreeStepsShortestPath.scs", "three_step_path_template", 250);
  shutdown(context);
}

}  // namespace pathFindingAgentTest
