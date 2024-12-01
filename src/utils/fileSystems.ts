export const seedPhrasesContent = `Im taking notes of my seed phrases incase I forget them. I'm such a boomer ffs!
Retirement wallet: pencil nature travel focus ladder talent unique skate glance immense echo village
Mortgage wallet: anchor metal globe elite mango motion silent power velvet garden glove beyond`;

export type FileSystemItem = {
    name: string;
    type: 'file' | 'directory';
    content?: string;
    children?: { [key: string]: FileSystemItem };
  };
  
  export type FileSystem = {
    [key: string]: FileSystemItem;
  };
  
  export const fileSystem: FileSystem = {
    'C:': {
      name: 'C:',
      type: 'directory',
      children: {
        Users: {
          name: 'Users',
          type: 'directory',
          children: {
            Boomer: {
              name: 'Boomer',
              type: 'directory',
              children: {
                Desktop: {
                  name: 'Desktop',
                  type: 'directory',
                  children: {
                    'SeedPhrases.txt': {
                      name: 'SeedPhrases.txt',
                      type: 'file',
                      content: seedPhrasesContent
                    },
                    'Command Prompt': {
                      name: 'Cmd.exe',
                      type: 'file'
                    }
                  }
                },
                Documents: {
                  name: 'Documents',
                  type: 'directory',
                  children: {}
                }
              }
            }
          }
        }
      }
    }
  };