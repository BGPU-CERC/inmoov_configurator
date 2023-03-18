#define MODBUS_PREFIX_LEN 3
#define MODBUS_PREFIX_VAL 97

#define MODBUS_STATE_PREFIX 10
#define MODBUS_STATE_TAG 11
#define MODBUS_STATE_LEN 12
#define MODBUS_STATE_VAL 13
#define MODBUS_STATE_COMPLETE 14

#define TLV_LEN_MAX 64

struct TLV
{
  char tag;
  char len;
  char val[TLV_LEN_MAX];
};

char modbus_read(char data);
bool modbus_complete();
TLV *modbus_tlv();
