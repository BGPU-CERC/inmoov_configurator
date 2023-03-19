#pragma once

union ByteArrayInteger
{
  unsigned char array[2];
  int integer;
};

int bytes_to_int(unsigned char high, unsigned char low);