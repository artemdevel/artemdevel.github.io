---
layout: post
title: Bash notes
---

Bash is an extremely wide topic. Here I just have some notes on bash which I personally find useful and which I want
here instead of searching the Internet. In most cases though it is better to search the Internet, read the manuals,
read Wikis like ArchWiki, check the code of other folks on GitHub and so on. Bash is the bottomless rabbit hole.

Bash itself is a standardized thing surprisingly. 
The full standard name is `IEEE POSIX P1003.2/ISO 9945.2 Shell and Tools standard`.

## My bash script template
```shell
#!/usr/bin/env bash

set -euo pipefail
```
In short - always use `/usr/bin/env <something>`, like `/usr/bin/env bash` or `/usr/bin/env python`. This is considered
a good practice which provides better bash scripts portability.

`set -euo pipefail` - sets some convenient safeguards for bash scripts. `-e` tells bash to immediately exit on any error.
`-u` tells bash to exit in case there are any undefined variables. `-o pipefail` tells bash to use any pipelined commands
exit codes if such commands fail and this prevents pipelined commands failures masked.

There are less frequent options I use like `-x` which tells bash to prints all commands it is about to execute which is
convenient for debugging.

In the case of bash always use linting tools. `ShellCheck` does the real great job and it is also integrated into 
`PyCharm` and in other IDEs from `JetBrains`. 

Sometimes it could be useful to set the `IFS` (Internal Field Separator) variable explicitly
```shell
IFS=$'\n\t'
```
by default it also includes a space which could lead to some undesirable behavior in case of strings or text processing.

## `.bashrc`
Bash history control
```shell
# don't put duplicate lines or lines starting with space in the history.
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=10000
HISTFILESIZE=20000

# without values the history will grow indefinitely
HISTSIZE=
HISTFILESIZE=

# When the shell exits, append to the history file instead of overwriting it
shopt -s histappend

# It is also possible to set date time for each command in the history like this
export HISTTIMEFORMAT="%F %T "

# Change the file location because certain bash sessions truncate .bash_history file upon close.
export HISTFILE=~/.bash_history_inf
```
Rather minimalistic bash prompts
```shell
PS1="\w $ "
PS1="[\w]$ "
PS1="[\u@\h \w]$ " 
```
Define an alias
```shell
alias ll='ls -alF'
```

## Scripting

#### Variable Annotations
Bash allows for a limited form of variable annotations. The most important ones are `local` and `readonly`
```shell
# DEFAULT_HOST can be overwritten with an environment variable of the same name
readonly DEFAULT_HOST=${DEFAULT_HOST:-localhost}
```
```
myfunc() {
   # initialize a local variable with the global default
   local some_host=${DEFAULT_HOST}
   ...
}
```
NOTE: It is possible to make a variable read-only that wasn't before
```shell
host_port=4000
host_port=8000
readonly host_port
host_port=8080 # error - host_port: readonly variable
```

#### Built-In Variables
- `$0` name of the script
- `$n` positional parameters to script/function
- `$$` PID of the script
- `$!` PID of the last command executed (and run in the background)
- `$?` exit status of the last command  (${PIPESTATUS} for pipelined commands)
- `$#` number of parameters to script/function
- `$@` all parameters to script/function (sees arguments as separate word)
- `$*` all parameters to script/function (sees arguments as single word)

## Misc
Various random bash tips and tricks.

#### Run the last entered command under `sudo`
```shell
sudo !!
```

#### Aliases
Expose what is defined in an alias and bypass it if required 
```shell
alias ls
ls='ls --time-style=long-iso --color=auto'
# run the command according to alias
ls -la
# bypass any shell function/alias lookup, run the original command
command ls -la
```

#### Get process stats
```shell
ps -p <pid> -o %cpu,%mem,cmd
```   

#### Double dash
Double dash means stop processing args and pass/use them as is.  
This way you can, for example, rm a file named "-f" or echo a string "-n".  
```shell
rm -- -f
echo -- -n
```
This also can be used in `ssh` command to execute remote commands. This syntax ensures that you can run commands 
on the remote server without `ssh` parsing them
```shell
ssh user@server -- command1 --arg1 --arg2
```

#### Brace Expansion
```shell
cp filename{,-old}
# which expands to
cp filename filename-old

cp filename{-old,}
cp filename{-v1,-v2}
```
```shell
mv /path/to/file{-old-name,-new-name}.txt
# which expands to
mv /path/to/file-old-name.txt /path/to/file-new-name.txt
```
