---
layout: post
title: SSH and SCP notes
---

`SSH` and `SCP` have near infinite amount of tips and tricks. This page contains only some typical usage of them.
Some parameters are similar for both tools but there small differences like `ssh` uses `-p` option to set a custom
SSH port while `scp` uses `-P` option for this etc.

#### SSH

###### Generate keys
This will generate a private and public key pair. The public key will have the `.pub` suffix at the end.
```shell
ssh-keygen -t ed25519 -C "my_user@example.com" -f ~/.ssh/my_user_example_key_name
```

###### Copy keys
```shell
ssh-copy-id -i ~/.ssh/my_user_example_key_name.pub user@example.com
```
```shell
ssh-copy-id user@hostname.example.com
```
IMPORTANT: This command will copy ALL the keys to the remote host which is rarely a good idea

NOTE: For different port number use (this is valid for all `ssh` commands as well)  
```shell
ssh-copy-id user@example.com -p <port-number>
```

###### SSH login
```shell
ssh -i ~/.ssh/my_user_example_key_name.pub user@example.com
```
or if the user is configured in the `~/.ssh/config` file it can be just
```shell
ssh example
```

###### Force SSH password auth
```shell
ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no -v -p 3333 user@example.com
ssh -o IdentitiesOnly=yes -p 3333 user@example.com
```
NOTE: SSH auth can fail in case of many keys. So the exact key should be enforced explicitly

###### Remove key record from the `known_hosts` file
At some point the key reference will be added to the `known_hosts` files. If something is changed for the host it will be required to remove such record so a key will be re-added.
```shell
ssh-keygen -f "/home/ubuntu/.ssh/known_hosts" -R example.com
```

###### `~/.ssh/config` example
NOTE: Add `HashKnownHosts No` in the beginning of `~/.ssh/config` so host names won't be hashed in the `known_hosts` file.
```
Host example
    HostName example.com # (or it can be an IP address)
    User my_user
    AddKeysToAgent yes
    UseKeychain yes
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/my_user_example_key_name
    ServerAliveInterval 120
    ServerAliveCountMax 2
```

###### Test SSH key with GitHub
After the existing SSH key is imported into GitHub it can be tested like this
```shell
ssh -T git@github.com
```

###### Disable SSH login by password (on SSH server)
Change option below in the `/etc/ssh/sshd_config` file 
```
PasswordAuthentication no
PubkeyAuthentication yes
ChallengeResponseAuthentication no
```

###### Execute a remote command via SSH
```shell
ssh -t example.com 'sudo systemctl restart ...'
```
NOTE: The `-t` option is used for pseudo terminal allocation. But it could work without `-t` as well.
```shell
ssh user@example.com "ls -la"
```
The `-s` option allows to send args to the remote scripts.
```shell
ssh user@example.com 'bash -s arg1 arg2' < local_script.sh
``` 
another approach
```shell
ssh user@example.com <<'ENDSSH'
# commands to run on remote host
ENDSSH
```
and one more approach
```shell
ssh user@example.com ARG1=$ARG1 ARG2=$ARG2 'bash -s' <<'ENDSSH'
  # commands to run on remote host
  echo $ARG1 $ARG2
ENDSSH
```

###### SSH Escape Sequences
Press `~` then `?` to see help.    
`~.` - terminate connection. Useful for broken sessions.  
Sometime `Ctrl+D` could be handy to terminate a session.

###### Check SSH with other tools
```shell
nc example.com 22
```
possible output
```
SSH-2.0-OpenSSH_7.2p2 Ubuntu-4ubuntu2.10
```

###### SSH tunnels
```shell
ssh -f -N -L 2000:example.com:25 user@example.com
```
`-f` - go background  
`-N` - don't execute commands on the remote machine  
Example `-L local_port:remote_server:remote_port jump_server`  
```shell
ssh -L 5439:server1.com:5439 -L 27027:server2.com:27017 jump.example.com
```
It could be as large as required.  
NOTE: There is a way to set tunnels in config
```
Host example
    ...
    LocalFoward 5439 localhost:5439
    ...
```

#### SCP

###### Copy files and folders with `scp`
For folders use `-r` and for the src folder don't use the trailing slash.  
Use `-v` for the progress (though it show SSH connection messages as well).
Use `-i` for SSH keys. Use `-P` for a custom port. The `~` can be used in remote paths.
```shell
scp -r -i /path/to/ssh/key user@host:/some/remote/path /some/local/path
```
