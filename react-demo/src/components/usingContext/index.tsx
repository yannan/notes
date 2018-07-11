import * as React from 'react';
import { ThemeContext, themes } from './theme-context';
import ThemedButton from './themed-button';

function Toolbar(props: any) {
    return (
        <ThemedButton onClick={props.changeTheme}>
            {props.children}
            Change Theme
        </ThemedButton>
    );
}

export default class UsingContext extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            theme: themes.light
        };
    }

    toggleTheme() {
        this.setState((state: any) => ({
            theme:
                state.theme === themes.dark
                    ? themes.light
                    : themes.dark
        }));
    }

    render() {
        return (
            <div>
                <ThemeContext.Provider value={this.state.theme}>
                    <Toolbar changeTheme={this.toggleTheme.bind(this)}>eee</Toolbar>
                </ThemeContext.Provider>
            </div>
        );
    }
}