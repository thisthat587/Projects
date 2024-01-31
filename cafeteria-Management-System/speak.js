const say = require('say');

const text = 'welcome';

try
{
    say.speak(text, 'espeak', 1.0, null, null, { espeak: { amplitude: 100, wordgap: 0, pitch: 50, variant: 'f5' } });
} catch (error)
{
    console.error(error);
}