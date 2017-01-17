{
  'targets': [
    {
      'target_name': 'node-icu-charset-detector',
      'sources': [ 'node-icu-charset-detector.cpp' ],
      'include_dirs': [ "<!(node -e \"require('nan')\")" ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'conditions': [
        ['OS!="win"', {
          'cflags!': [ '-fno-exceptions', '`icu-config --cppflags`' ],
          'libraries': [ '`icu-config --detect-prefix --ldflags`' ],
          'include_dirs': [
              '/opt/local/include',
              '/usr/local/include'
          ]
        }],
        ['OS=="mac"', {
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
          }
        }],
        ['OS=="win"', {
          'cflags!': [ '-fno-exceptions' ],
          'include_dirs': [
            '<!(echo %ICU_DIRECTORY%)\\include'
          ],
          'libraries': [
            '<!(echo %ICU_DIRECTORY%)\lib64\icuin.lib'
          ]
        }]
      ]
    },
    {
      "target_name": "move_after_build",
      "type": "none",
      "dependencies": [ "node-icu-charset-detector" ],
      'conditions': [
        ['OS=="win"', {
          "copies": [
            {
              "files": [
                "<!(echo %ICU_DIRECTORY%)\\bin64\\icudt58.dll",
                "<!(echo %ICU_DIRECTORY%)\\bin64\\icuin58.dll",
                "<!(echo %ICU_DIRECTORY%)\\bin64\\icuio58.dll",
                "<!(echo %ICU_DIRECTORY%)\\bin64\\icule58.dll",
                "<!(echo %ICU_DIRECTORY%)\\bin64\\iculx58.dll",
                "<!(echo %ICU_DIRECTORY%)\\bin64\\icutu58.dll",
                "<!(echo %ICU_DIRECTORY%)\\bin64\\icuuc58.dll",
              ],
              "destination": "<(module_root_dir)\\build\\Release"
            }
          ]
        }]
      ]
    }
  ]
}
