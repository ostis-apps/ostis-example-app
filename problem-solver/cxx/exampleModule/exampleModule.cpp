/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "exampleModule.hpp"
#include "keynodes/keynodes.hpp"
#include "agents/SubdividingSearchAgent.hpp"
#include "agents/IsomorphicSearchAgent.hpp"

using namespace exampleModule;

SC_MODULE_REGISTER(ExampleModule)
  ->Agent<SubdividingSearchAgent>()
  ->Agent<IsomorphicSearchAgent>();
