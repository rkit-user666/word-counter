import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('word-counter.countStats', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No active editor found.');
            return;
        }

        const selection = editor.selection;
        const selectedText = editor.document.getText(selection);

        if (!selectedText || selectedText.trim() === '') {
            vscode.window.showWarningMessage('Please select some text to analyze.');
            return;
        }

        const charCountWithSpaces = selectedText.length;
        const charCountNoSpaces = selectedText.replace(/\s/g, '').length;
        
        const words = selectedText.trim().split(/\s+/);
        const wordCount = selectedText.trim() === '' ? 0 : words.length;

        const lineCount = selectedText.split('\n').length;

        const message = `📊 Text Statistics:\n\n` +
                        `• Characters (with spaces): ${charCountWithSpaces}\n` +
                        `• Characters (no spaces): ${charCountNoSpaces}\n` +
                        `• Word count: ${wordCount}\n` +
                        `• Line count: ${lineCount}`;

        vscode.window.showInformationMessage(message, { modal: true });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}