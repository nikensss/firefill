import ora from 'ora';

export interface Nora {
  text: string;
  succeed(t: string): void;
  fail(t: string): void;
}

export function nora(text = 'Loading...'): Nora {
  const spinner = ora(text).start();

  return {
    get text(): string {
      return text;
    },
    set text(t: string) {
      spinner.text = `${text} ${t}`;
    },
    succeed(t: string) {
      spinner.succeed(t);
    },
    fail(t: string) {
      spinner.fail(t);
    }
  };
}
