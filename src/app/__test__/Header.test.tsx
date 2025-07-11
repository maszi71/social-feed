import { render, screen } from '@testing-library/react';
import en from '../dictionaries/en.json';
import Header from '../components/Header';
import { ThemeProvider } from '../providers/ThemeProvider';
import { LangProvider } from '../providers/LangContext';

jest.mock('../providers/LangContext', () => {
  const actual = jest.requireActual('../providers/LangContext');
  return {
    ...actual,
    useT: () => en,
  };
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn() }),
  usePathname: () => '/en',
}));

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(() => ({
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    })),
  });
});

describe('Header', () => {
  const defaultProps = {
    welcomeMessage: en.welcome,
    themeLabels: en.theme,
  };

  it('renders the welcome message', () => {
    render(
      <ThemeProvider>
        <LangProvider lang="en" dictionary={en}>
          <Header {...defaultProps} />
        </LangProvider>
      </ThemeProvider>
    );
    expect(screen.getByText(en.welcome)).toBeInTheDocument();
  });

  it('renders the New Post link with correct href and text', () => {
    render(
      <ThemeProvider>
        <LangProvider lang="en" dictionary={en}>
          <Header {...defaultProps} />
        </LangProvider>
      </ThemeProvider>
    );
    const link = screen.getByText(en.newPost);
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/post/new');
  });

  it('renders LanguageSwitcher and ThemeToggle', () => {
    render(
      <ThemeProvider>
        <LangProvider lang="en" dictionary={en}>
          <Header {...defaultProps} />
        </LangProvider>
      </ThemeProvider>
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
