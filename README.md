# Ableton UI

Running app
```
nvm use
./run.sh
```

https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html

To build/deploy the app
```
yarn build
aws s3 sync build s3://lbert.io/
```

## Setting up MIDI IN/OUT

You must use different in and out interfaces, for some reason if you use the same one, 
you can't get in/out to work at the same time.

You should set up an IAC Driver with AUI TX and AUI RX, and wire those into both the UI 
and Ableton.

In the UI set the RX to Midi Input and the TX to Midi Output
and in ableton set the RX to the Midi Output and TX to Midi Input

## MIDI Implementation

### Sysex

Message format: `0xF0 MID SB message 0xF7`
 - The `0xFO` is the sysex start byte, and `0xF7` is the sysex end byte.
 - `MID` is the Manufacturer ID, this implementation is using `0x02`
 - `SB` is the status byte, which is propritery to this implemenation, see table below
 - `message` is the ascii encoded bytes, delimited by 0x01.

#### Received (rx)
| Status Byte | Message Type   | Message fields                                                                                           |
|-------------|----------------|----------------------------------------------------------------------------------------------------------|
| `0x03`      | Init project   | (trackCount: number)                                                                                     |
| `0x04`      | Done project   | ()                                                                                                       |
| `0x05`      | Init track     | (name: string, trackIndex: number, color: number)                                                        |
| `0x06`      | Init clip      | (name: string, trackIndex: number, clipIndex: number, color: number, startTime: number, endTime: number) |
| `0x07`      | Beat           | (value: number)                                                                                          | 
| `0x08`      | Bar Beat       | (value: number)                                                                                          |
| `0x09`      | Time Signature | (beats: number, division: number)                                                                        |
| `0x0A`      | Tempo          | (bpm: number)                                                                                            |
| `0x0B`      | Is Playing     | (isPlaying: number)                                                                                      |
                                                                                       |

#### Transmit (tx)
| Status Byte | Message Type | Message fields     |
|-------------|--------------|--------------------|
| `0x50`      | Play         | ()                 |
| `0x51`      | Stop         | ()                 |
| `0x52`      | Jump To Cue  | (cueIndex: number) |
| `0x53`      | Jump By      | (beat: number)     |
