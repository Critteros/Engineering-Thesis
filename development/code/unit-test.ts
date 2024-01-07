  it.each`
      value                              | expected
      ${['STANDARD', 'HIDDEN', 'LOCAL']} | ${['STANDARD', 'HIDDEN', 'LOCAL']}
      ${['STANDARD']}                    | ${['STANDARD', 'HIDDEN', 'LOCAL']}
      ${['LOCAL']}                       | ${['LOCAL', 'HIDDEN', 'STANDARD']}
      ${['HIDDEN']}                      | ${['HIDDEN', 'LOCAL', 'STANDARD']}
      ${['LOCAL', 'HIDDEN']}             | ${['LOCAL', 'HIDDEN', 'STANDARD']}
      ${['HIDDEN', 'LOCAL']}             | ${['HIDDEN', 'LOCAL', 'STANDARD']}
      ${['LOCAL', 'STANDARD']}           | ${['LOCAL', 'STANDARD', 'HIDDEN']}
      ${['STANDARD', 'LOCAL']}           | ${['STANDARD', 'LOCAL', 'HIDDEN']}
      ${['HIDDEN', 'STANDARD']}          | ${['HIDDEN', 'STANDARD', 'LOCAL']}
      ${['STANDARD', 'HIDDEN']}          | ${['STANDARD', 'HIDDEN', 'LOCAL']}
      ${[]}                              | ${['LOCAL', 'HIDDEN', 'STANDARD']}
    `(
      'hierarchy is $expected when passed $value',
      ({
        value,
        expected,
      }: {
        value: ConfigResolver['hierarchy'];
        expected: ConfigResolverOptions['hierarchy'];
      }) => {
        expect(new ConfigResolver({ hierarchy: value }).hierarchy).toEqual(expected);
      },
    );
  });