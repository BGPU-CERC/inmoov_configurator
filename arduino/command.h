#pragma once

#include "modbus.h"

#define CMD_SERVO_SET_ANGLE 10
#define CMD_SERVO_STOP_ALL 11

void command_process(TLV *tlv);
