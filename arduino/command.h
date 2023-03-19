#pragma once

#include "modbus.h"

#define CMD_SERVO_SET_ANGLE 10

void command_process(TLV *tlv);
