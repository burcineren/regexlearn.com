import { useRouter } from 'next/router';
import { Popover } from '@headlessui/react';

import getIntlPath from 'src/utils/getIntlPath';
import { langNames } from 'src/localization';
import React from 'react';
import * as Select from '@radix-ui/react-select';

const langList = Object.keys(langNames).map(langKey => ({
  value: langKey,
  label: langNames[langKey],
}));
const LanguageSelect = () => {
  const { pathname, query } = useRouter();
  let currentLang = langNames[query.lang as string];
  const availableLangList = langList.filter(({ value }) => query.lang !== value);
  return (
    <Select.Root>
      <Select.Trigger className="text-lg">
        <Select.Value placeholder={currentLang} />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="absolute rtl:left-0 ltr:right-0 z-10 mt-2 p-2 border w-28 border-neutral-700 bg-neutral-800 shadow-md rounded-md">
          <Select.Viewport className="SelectViewport">
            {availableLangList.map(({ label, value }) => (
              <Select.Group>
                <Select.Item value={label} key={value}>
                  <Select.ItemText>
                    <a
                      href={getIntlPath({ href: pathname, lang: value, query })}
                      className="inline-flex p-1  w-1/3 text-lg hover:scale-125"
                    >
                      <span>{label}</span>
                    </a>
                  </Select.ItemText>
                </Select.Item>
              </Select.Group>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default LanguageSelect;
