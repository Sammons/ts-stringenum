Find yourself typing out string enums in typescript? This will help.

Instead of doing something like

        const UserTypes = {
            mvp: 'mvp' as 'mvp',
            regular: 'regular' as 'regular',
            unicorn: 'unicorn' as 'unicorn'
        }

Just do

        import {StringEnum} from 'ts-stringenum';

        const UserTypes = StringEnum(['mvp', 'regular', 'unicorn']);

for the same result.

You can also use a default import:

        import whateveryouwant from 'ts-stringenum';


Licensed under MIT, have fun!