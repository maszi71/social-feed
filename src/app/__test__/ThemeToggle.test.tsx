import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import ThemeToggle from '../components/ThemeToggle';

const mockMatchMedia = jest.fn().mockReturnValue({ matches: false });
Object.defineProperty(window, 'matchMedia', { value: mockMatchMedia });

describe('ThemeToggle', () => {
  const defaultProps = {
    labels: { light: 'Light', dark: 'Dark' },
  };

  beforeEach(() => {
    localStorage.clear();
    mockMatchMedia.mockReturnValue({ matches: false });
  });

  it('renders Dark Mode label when theme is light', () => {
    render(
      <ThemeProvider>
        <ThemeToggle {...defaultProps} />
      </ThemeProvider>
    );
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('renders Light Mode label when theme is dark', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <ThemeToggle {...defaultProps} />
      </ThemeProvider>
    );
    expect(screen.getByText('Light')).toBeInTheDocument();
  });

  it('toggles theme when button is clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle {...defaultProps} />
      </ThemeProvider>
    );
    const button = screen.getByRole('button', { name: 'Toggle theme' });
    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});