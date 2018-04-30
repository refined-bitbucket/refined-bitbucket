/* eslint quote-props: off */

// These are only the file extensions that don't directly match
// the class name to be used by PrismJS to highlight the code,
// or the ones to be overriden.
// For example, '.css' is not included here because its class name is 'language-css'.
// Also, '.js' is included here so that 'language-jsx' is used instead of the default 'language-js'.

// To see if your language is supported by the extension check the full list here:
// http://prismjs.com/download.html?themes=prism&languages=markup+css+clike+javascript+abap+actionscript+ada+apacheconf+apl+applescript+c+asciidoc+asm6502+aspnet+autohotkey+autoit+bash+basic+batch+bison+brainfuck+bro+cpp+csharp+arduino+coffeescript+ruby+csp+css-extras+d+dart+diff+django+docker+eiffel+elixir+elm+erlang+fsharp+flow+fortran+gherkin+git+glsl+go+graphql+groovy+haml+handlebars+haskell+haxe+http+hpkp+hsts+ichigojam+icon+inform7+ini+io+j+java+jolie+json+julia+keyman+kotlin+latex+less+livescript+lolcode+lua+makefile+markdown+matlab+mel+mizar+monkey+n4js+nasm+nginx+nim+nix+nsis+objectivec+ocaml+opencl+oz+parigp+parser+pascal+perl+php+php-extras+powershell+processing+prolog+properties+protobuf+pug+puppet+pure+python+q+qore+r+jsx+typescript+renpy+reason+rest+rip+roboconf+crystal+rust+sas+sass+scss+scala+scheme+smalltalk+smarty+sql+stylus+swift+tcl+textile+twig+tsx+vbnet+verilog+vhdl+vim+wiki+xeora+xojo+yaml#category-languages
// If your language is included in that list, but is not being
// highlighted by the extension, you probably need to add an entry here!
// If you are going to include any new entry, please do so in alphabetical order.

module.exports = {
    '.cc': 'language-cpp',
    '.cfc': 'language-actionscript',
    '.cfm': 'language-markup',
    '.coffee': 'language-coffeescript',
    '.config': 'language-markup',
    '.cs': 'language-csharp',
    '.cshtml': 'language-markup',
    '.csproj': 'language-markup',
    '.erl': 'language-erlang',
    '.ex': 'language-elixir',
    '.exs': 'language-elixir',
    '.flow': 'language-jsx',
    '.fs': 'language-fsharp',
    '.fsi': 'language-fsharp',
    '.fsscript': 'language-fsharp',
    '.fsx': 'language-fsharp',
    '.gradle': 'language-groovy',
    '.h': 'language-c',
    '.hbs': 'language-handlebars',
    '.hpp': 'language-cpp',
    '.jl': 'language-julia',
    '.js': 'language-jsx',
    '.jsp': 'language-java',
    '.kt': 'language-kotlin',
    '.m': 'language-objectivec',
    '.md': 'language-markdown',
    '.php3': 'language-php',
    '.php4': 'language-php',
    '.php5': 'language-php',
    '.phps': 'language-php',
    '.phtml': 'language-php',
    '.pl': 'language-perl',
    '.pm': 'language-perl',
    '.ps1': 'language-powershell',
    '.py': 'language-python',
    '.rb': 'language-ruby',
    '.rlib': 'language-rust',
    '.rs': 'language-rust',
    '.sbt': 'language-scala',
    '.sfproj': 'language-markup',
    '.sh': 'language-bash',
    '.snap': 'language-jsx',
    '.styl': 'language-stylus',
    '.svcmap': 'language-markup',
    '.t': 'language-perl',
    '.tpl': 'language-smarty',
    '.tt': 'language-markup',
    '.ts': 'language-typescript',
    '.tsx': 'language-tsx',
    '.vue': 'language-jsx',
    '.wxs': 'language-markup',
    '.xaml': 'language-markup',
    '.xsd': 'language-markup',
    '.yml': 'language-yaml',

    // Universally named files
    jenkinsfile: 'language-groovy',
    rakefile: 'language-ruby',
    vagrantfile: 'language-ruby'
};
