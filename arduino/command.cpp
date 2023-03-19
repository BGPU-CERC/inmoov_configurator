#include <Arduino.h>
#include <HardwareSerial.h>
#include "command.h"
#include "converter.h"

void cmd_servo_set_angle(TLV *tlv)
{
  int pin = tlv->val[0];
  int angle = bytes_to_int(tlv->val[1], tlv->val[2]);
  int speed = bytes_to_int(tlv->val[3], tlv->val[4]);
  Serial.print("CMD_SERVO_SET_ANGLE:");
  Serial.print(" pin: ");
  Serial.print(pin, DEC);
  Serial.print(" angle: ");
  Serial.print(angle, DEC);
  Serial.print(" speed: ");
  Serial.print(speed, DEC);
  Serial.print("\n");
}

void cmd_unknown(TLV *tlv)
{
  Serial.print("CMD_UNKNOWN:");
  Serial.print(" tag: ");
  Serial.print(tlv->tag, HEX);
  Serial.print(" len: ");
  Serial.print(tlv->len, HEX);
  Serial.print(" val: ");

  for (char i = 0; i < tlv->len; i++)
  {
    Serial.print(tlv->val[i], HEX);
  }

  Serial.print("\n");
}

void command_process(TLV *tlv)
{
  if (tlv->tag == CMD_SERVO_SET_ANGLE && tlv->len == 5)
  {
    cmd_servo_set_angle(tlv);
  }
  else
  {
    cmd_unknown(tlv);
  }
}
