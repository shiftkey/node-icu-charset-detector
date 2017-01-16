{
  'targets': [
    {
      'target_name': 'node-icu-charset-detector',
      'sources': [ 'node-icu-charset-detector.cpp' ],
      'include_dirs': [ "<!(node -e \"require('nan')\")" ],
      'conditions': [
        ['OS!="win"', {
          'cflags!': [ '-fno-exceptions', '`icu-config --cppflags`' ],
          'cflags_cc!': [ '-fno-exceptions' ],
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
          'include_dirs': [
              '<!(echo %ICU_DIRECTORY%)\include',
              '<!(echo %ICU_DIRECTORY%)\lib64',
          ],
          'libraries': [
            '<!(echo %ICU_DIRECTORY%)\lib64\*.lib',
          ],
        }]
      ]
    }
  ]
}
