# Dynamic Hosts

Dynamic Hosts file generation based on a directory structure.

Using `dynahosts` will update your `/etc/hosts` file and add all the current directories as entries.

To give your current user permission to edit the hosts file, you will need to use:

    chown `id -u`:`id -g` /etc/hosts