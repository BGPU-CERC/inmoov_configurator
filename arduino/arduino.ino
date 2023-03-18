#include "modbus.h"

TLV *packet = modbus_tlv();

void setup()
{
  Serial.begin(9600);
}

void loop()
{
  if (modbus_complete())
  {
    Serial.print("\ntag: ");
    Serial.print(packet->tag);
    Serial.print("\nlen: ");
    Serial.print(packet->len);
    Serial.print("\nval: ");
    Serial.print(packet->val);
  }
  else if (Serial.available() > 0)
  {
    char c = Serial.read();
    Serial.print("c: ");
    Serial.print(c, DEC);
    Serial.print("\n");

    char r = modbus_read(c);
    Serial.print("r: ");
    Serial.print(r, DEC);
    Serial.print("\n");
  }
}
