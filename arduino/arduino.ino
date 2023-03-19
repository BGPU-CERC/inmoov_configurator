#include "modbus.h"
#include "command.h"

TLV *packet = modbus_tlv();

void setup()
{
  Serial.begin(115200);
}

void loop()
{
  if (modbus_complete())
  {
    command_process(packet);
    modbus_reset();
  }
  else if (Serial.available() > 0)
  {
    unsigned char c = Serial.read();
    modbus_read(c);
  }
}
