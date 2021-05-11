import { execSync } from 'child_process';
import { readFileSync } from 'fs';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function addAliases(aliases, prefix) {
  const currentHosts = readFileSync('/etc/hosts').toString();

  const newHosts = aliases
    .reduce(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (result, { host, ip }) => {
        if (currentHosts.includes(host)) {
          console.warn(`warn: host ${host} already exists in /etc/hosts`);
          return result;
        }

        return [...result, `${ip} ${host}`];
      },
      [`############\n### express-host-aliases\n${prefix ? `### service: ${prefix}\n` : ''}`]
    )
    .concat('\n############\n');

  if (newHosts.length > 2) {
    // eslint-disable-next-line
    execSync(`sudo sh -c "echo \'${newHosts.join('\n')}\' >> /etc/hosts"`);
  }
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const hosts = require('../../server/configs/hosts.json');

(function () {
  addAliases(hosts, 'ssr-project-name');
})();
