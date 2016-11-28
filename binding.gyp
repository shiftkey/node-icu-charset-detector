{
  'targets': [
    {
      'target_name': 'node-icu-charset-detector',
      'sources': [ 'node-icu-charset-detector.cpp' ],
      'cflags!': [ '-fno-exceptions', '`icu-config --cppflags`' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'include_dirs': [ "<!(node -e \"require('nan')\")" ],
      'conditions': [
        ['OS=="mac"', {
          'libraries': [ '`icu-config --detect-prefix --ldflags`' ],
          'include_dirs': [
              '/opt/local/include',
              '/usr/local/include'
          ],
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
          }
        }],
        ['OS=="win"', {
          'include_dirs': [
            'external/win32/icu/include'
          ],
          'libraries': [
            '../external/win32/icu/lib64/icuin.lib'
          ]
        }]
      ]
    }
  ]
}
