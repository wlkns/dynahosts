# Dynamic Hosts

Dynamic Hosts file generation based on a directory structure.

Using `dynahosts` will update your `/etc/hosts` file and add all the current directories as entries.

To give your current user permission to edit the hosts file, you will need to use:

    chown `id -u`:`id -g` /etc/hosts

Example:

    arkin@iMac:~/Hosts$ ls -alh
    total 24
    drwxr-xr-x   6 arkin  staff   204B  1 Dec 17:11 .
    drwxr-xr-x+ 52 arkin  staff   1.7K  1 Dec 17:10 ..
    lrwxr-xr-x   1 arkin  staff    22B  1 Dec 09:58 test.dev -> /Users/arkin/Sites/test1
    lrwxr-xr-x   1 arkin  staff    22B  1 Dec 09:58 test2.dev -> /Users/arkin/Sites/test2
    -rw-r--r--   1 arkin  staff     5B  1 Dec 16:48 ignore_this_because_its_a_file

    arkin@iMac:~/Hosts$ dynahosts
    hosts updated

    arkin@iMac:~/Hosts$ tail /etc/hosts
    # da:/Users/arkin/Hosts
    127.0.0.1 test.dev test2.dev
    # da