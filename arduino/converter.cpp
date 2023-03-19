#include "converter.h"

ByteArrayInteger converter;

int bytes_to_int(unsigned char high, unsigned char low)
{
  converter.array[1] = high;
  converter.array[0] = low;
  return converter.integer;
}