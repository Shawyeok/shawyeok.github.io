(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{297:function(a,t,s){a.exports=s.p+"assets/img/7d831e4af69e467aa20a1536440bc0cf.d75fb756.png"},298:function(a,t,s){a.exports=s.p+"assets/img/7cec444a9d034dd9ba00f5f1832fd586.5a017bdd.png"},299:function(a,t,s){a.exports=s.p+"assets/img/7ccfdcb86e1f4ca194a8ad2bebbfc2c9.771223ee.png"},300:function(a,t,s){a.exports=s.p+"assets/img/87b08a488c85447d97db559347abec75.54d30ccf.png"},301:function(a,t,s){a.exports=s.p+"assets/img/8a5289573fc04a2daaea2e7f19058466.92295e05.png"},302:function(a,t,s){a.exports=s.p+"assets/img/fa469a79f2e44355b8e724cfa54c7c15.76ab3629.png"},323:function(a,t,s){"use strict";s.r(t);var e=s(10),r=Object(e.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"一次bookkeeper-inode泄露问题的排查经历"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#一次bookkeeper-inode泄露问题的排查经历"}},[a._v("#")]),a._v(" 一次bookkeeper inode泄露问题的排查经历")]),a._v(" "),t("h2",{attrs:{id:"已知的未知"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#已知的未知"}},[a._v("#")]),a._v(" 已知的未知")]),a._v(" "),t("p",[a._v("某日笔者在漫游巡检负责的bookkeeper服务时发现bookie进程hold了一个已删除文件的文件描述符，如下，笔者当时不知道这个文件干嘛的，哪个组件创建和打开的，这属于"),t("code",[a._v("已知的未知")]),a._v("，因此需要一探究竟\n"),t("img",{attrs:{src:s(297),alt:"image.png"}}),a._v("\n首先这种情况在linux上虽然在文件目录上看不到这个文件，但是其inode还在，还是可以找回这个文件的，例如用下面这个命令转存pid 28335，fd编号276的文件")]),a._v(" "),t("p",[t("code",[a._v("cat /proc/28335/fd/276 > /tmp/copy")])]),a._v(" "),t("p",[a._v("文件不大4096，直接看一下文件内容，也没啥价值不知道做什么的\n"),t("img",{attrs:{src:s(298),alt:"image.png"}})]),a._v(" "),t("p",[a._v("然后笔者又去翻看了一下bookkeeper代码，并没有发现相关写该文件的代码。同时又检查了其它环境的服务，发现都存在这种情况，通过heapdump分析也找不到fd编号276的记录")]),a._v(" "),t("div",{staticClass:"language-sql extra-class"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("select")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("from")]),a._v(" java"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("io"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("FileDescriptor fd "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("where")]),a._v(" fd"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("fd "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("276")]),a._v("\n")])])]),t("p",[t("img",{attrs:{src:s(299),alt:"image.png"}})]),a._v(" "),t("p",[a._v("同时搜其它文件是可以搜到的\n"),t("img",{attrs:{src:s(300),alt:"image.png"}})]),a._v(" "),t("p",[a._v("另外笔者又去找别人check了一下其它环境是否存在这种情况，答复是没有；不过既然这个问题在我这里是必现就好查，因此单独起了一个测试环境上strace，果然重现了")]),a._v(" "),t("p",[t("code",[a._v("strace -ff -o /tmp/strace.out /opt/java/bin/java balabala")])]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# lsof -Pn -p `jps | awk '$2 == \"Main\" {print $1}'` | grep deleted")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("java")]),a._v("    "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("21419")]),a._v(" root  352u      REG              "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("202,2")]),a._v("       "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("4096")]),a._v("    "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("524642")]),a._v(" /tmp/ffirkKtRJ "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("deleted"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# grep /tmp/ffirkKtRJ strace.out.*")]),a._v("\nstrace.out.21696:open"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/tmp/ffirkKtRJ"')]),a._v(", O_RDWR"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v("O_CREAT"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v("O_EXCL, 0600"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("352")]),a._v("\nstrace.out.21696:unlink"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"/tmp/ffirkKtRJ"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("                "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v("\n")])])]),t("p",[a._v("现在知道具体操作该文件的线程id了，可见是先open然后unlink都是在这个线程"),t("code",[a._v("21696")]),a._v("操作的，看一下这个线程是什么")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("top")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-b")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-Hp")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("`")]),a._v("jps "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("awk")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[a._v("'$2 == \"Main\" {print $1}'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[a._v("`")])]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("grep")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("21696")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("21696")]),a._v(" root      "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("20")]),a._v("   "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("8315728")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("245388")]),a._v("  "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("22076")]),a._v(" S  "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.0")]),a._v("  "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1.5")]),a._v("   "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v(":00.24 BookieJournal-3\n"),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("21696")]),a._v(" root      "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("20")]),a._v("   "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("8315728")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("245388")]),a._v("  "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("22076")]),a._v(" S  "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0.0")]),a._v("  "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1.5")]),a._v("   "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("0")]),a._v(":00.24 BookieJournal-3\n^C\n")])])]),t("p",[a._v("然后用"),t("a",{attrs:{href:"https://github.com/async-profiler/async-profiler",target:"_blank",rel:"noopener noreferrer"}},[a._v("async-profiler"),t("OutboundLink")],1),a._v("去profile "),t("code",[a._v("unlink")]),a._v("这个syscall，这个问题如果能拿到stacktrace，基本也就有眉目了")]),a._v(" "),t("p",[t("code",[a._v("/opt/java/bin/java -agentpath:/path/to/async-profiler-2.8-linux-x64/build/libasyncProfiler.so=start,event=unlink,threads balabala")])]),a._v(" "),t("p",[t("img",{attrs:{src:s(301),alt:"image.png"}}),a._v("\n果然，"),t("code",[a._v("unlink")]),a._v("是从"),t("code",[a._v("org.apache.bookkeeper.util.NativeIO")]),a._v("中发起的，细看一下代码发现引入了"),t("code",[a._v("net.java.dev.jna:jna")]),a._v("这个包，这个包里面包含了一些JNI的代码，checkout指定的版本，在这里:\n"),t("img",{attrs:{src:s(302),alt:"image.png"}})]),a._v(" "),t("p",[a._v("原来是bookie中NativeIO这个类用到了"),t("a",{attrs:{href:"https://github.com/java-native-access/jna",target:"_blank",rel:"noopener noreferrer"}},[a._v("jna"),t("OutboundLink")],1),a._v("这个组件，jna这个组件又引用了"),t("a",{attrs:{href:"https://en.wikipedia.org/wiki/Libffi",target:"_blank",rel:"noopener noreferrer"}},[a._v("libffi"),t("OutboundLink")],1),a._v("\n至此到这里也就算是揭开了上面的"),t("code",[a._v("已知的未知")])]),a._v(" "),t("blockquote",[t("p",[a._v("笔者当时不知道这个文件干嘛的，哪个组件创建和打开的")])]),a._v(" "),t("h2",{attrs:{id:"总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[a._v("#")]),a._v(" 总结")]),a._v(" "),t("ol",[t("li",[a._v("为什么这个问题在笔者这里必现，但是找别人check其它环境没有类似的情况？\n因为这里别人的环境是较新的版本，已经把jna组件拿掉了，详情可见: https://github.com/apache/bookkeeper/pull/3824")]),a._v(" "),t("li",[a._v("这个问题查下来是"),t("strong",[a._v("无用但是有趣")]),a._v("，减少了一个"),t("code",[a._v("已知的未知")]),a._v("风险")]),a._v(" "),t("li",[a._v("这里要感谢一下bookkeeper社区的"),t("a",{attrs:{href:"https://github.com/hangc0276",target:"_blank",rel:"noopener noreferrer"}},[a._v("Chen Hang"),t("OutboundLink")],1),a._v("，帮忙check以及提供思路")])])])}),[],!1,null,null,null);t.default=r.exports}}]);