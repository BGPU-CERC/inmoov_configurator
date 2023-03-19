#include "modbus.h"

TLV *packet = modbus_tlv();

void setup()
{
  Serial.begin(115200);
}

void loop()
{
  if (modbus_complete())
  {
    Serial.print("\ntag: ");
    Serial.print(packet->tag, HEX);
    Serial.print("\nlen: ");
    Serial.print(packet->len, HEX);
    Serial.print("\nval: ");

    for (char i = 0; i < TLV_LEN_MAX; i++)
    {
      Serial.print(packet->val[i], HEX);
    }

    modbus_reset();
  }
  else if (Serial.available() > 0)
  {
    unsigned char c = Serial.read();
    Serial.print(" byte: ");
    Serial.print(c, DEC);
    unsigned char r = modbus_read(c);
    Serial.print(" state: ");
    Serial.print(r, DEC);
    Serial.print("\n");
  }
}
