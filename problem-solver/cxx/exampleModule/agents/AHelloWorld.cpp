/*
* This source file is part of an OSTIS project. For the latest info, see http://ostis.net
* Distributed under the MIT License
* (See accompanying file COPYING.MIT or copy at http://opensource.org/licenses/MIT)
*/

#include "AHelloWorld.hpp"

#include <sc-memory/cpp/sc_stream.hpp>
#include <iostream>

using namespace utils;
using namespace std;

namespace exampleModule
{

SC_AGENT_IMPLEMENTATION(AHelloWorld)
{
  if (!edgeAddr.IsValid())
    return SC_RESULT_ERROR;

  cout<<"Hello World!"<<endl;
  return SC_RESULT_OK;
}
}
