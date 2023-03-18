#include "modbus.h"

struct TLV tlv;

char modbus_state = MODBUS_STATE_PREFIX;
char modbus_prefix_index = 0;
char modbus_val_index = 0;

void modbus_check_prefix(char data)
{
  if (data == MODBUS_PREFIX_VAL)
  {
    modbus_prefix_index += 1;
  }
  else
  {
    modbus_prefix_index = 0;
  }
  if (modbus_prefix_index == MODBUS_PREFIX_LEN)
  {
    modbus_state = MODBUS_STATE_TAG;
  }
}

void modbus_check_len(char data)
{
  if (data > 0)
  {
    modbus_state = MODBUS_STATE_VAL;
  }
  else
  {
    modbus_state = MODBUS_STATE_COMPLETE;
  }
}

void modbus_check_val()
{
  if (modbus_val_index >= tlv.len)
  {
    modbus_state = MODBUS_STATE_COMPLETE;
  }
}

char modbus_read(char data)
{
  switch (modbus_state)
  {
  case MODBUS_STATE_PREFIX:
    modbus_check_prefix(data);
    break;
  case MODBUS_STATE_TAG:
    tlv.tag = data;
    modbus_state = MODBUS_STATE_LEN;
    break;
  case MODBUS_STATE_LEN:
    tlv.len = data;
    modbus_check_len(data);
    break;
  case MODBUS_STATE_VAL:
    tlv.val[modbus_val_index++] = data;
    modbus_check_val();
    break;
  default:
    break;
  }

  return modbus_state;
}

bool modbus_complete()
{
  return modbus_state == MODBUS_STATE_COMPLETE;
}

TLV *modbus_tlv()
{
  return &tlv;
}
