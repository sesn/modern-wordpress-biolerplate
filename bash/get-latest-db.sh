FILES = $(find . -type f | grep ".sql$" | cut -d'/' -f3 | sort -r)
