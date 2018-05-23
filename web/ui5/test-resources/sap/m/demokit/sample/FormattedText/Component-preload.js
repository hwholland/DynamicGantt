sap.ui.require.preload({
	"web/ui5/test-resources/sap/m/demokit/sample/FormattedText/Component.js": "sap.ui.define([\"sap/ui/core/UIComponent\"],function(e){\"use strict\";return e.extend(\"sap.m.sample.FormattedText.Component\",{metadata:{rootView:\"sap.m.sample.FormattedText.V\",dependencies:{libs:[\"sap.m\",\"sap.ui.layout\"]},config:{sample:{files:[\"V.view.xml\"]}}}})});",
	"web/ui5/test-resources/sap/m/demokit/sample/FormattedText/V.view.xml": "<mvc:View\n\txmlns:l=\"sap.ui.layout\"\n\txmlns:mvc=\"sap.ui.core.mvc\"\n\txmlns=\"sap.m\"><VBox class=\"sapUiLargeMargin\"><FormattedText\n\t\t\thtmlText='&lt;h3&gt;subheader&lt;/h3&gt;\n\t\t\t\t&lt;p&gt;link: &lt;a href=\"//www.sap.com\" style=\"color:green; font-weight:600;\"&gt;link to sap.com&lt;/a&gt; - links open in a new window.&lt;/p&gt;\n\t\t\t\t&lt;p&gt;paragraph: &lt;strong&gt;strong&lt;/strong&gt; and &lt;em&gt;emphasized&lt;/em&gt;.&lt;/p&gt;\n\t\t\t\t&lt;p&gt;list:&lt;/p&gt;\n\t\t\t\t&lt;ul&gt;&lt;li&gt;list item 1&lt;/li&gt;&lt;li&gt;list item 2&lt;ul&gt;&lt;li&gt;sub item 1&lt;/li&gt;&lt;li&gt;sub item 2&lt;/li&gt;&lt;/ul&gt;&lt;/li&gt;&lt;/ul&gt;\n\t\t\t\t&lt;p&gt;pre:&lt;/p&gt;&lt;pre&gt;abc    def    ghi&lt;/pre&gt;\n\t\t\t\t&lt;p&gt;code: &lt;code&gt;var el = document.getElementById(\"myId\");&lt;/code&gt;&lt;/p&gt;\n\t\t\t\t&lt;p&gt;cite: &lt;cite&gt;a reference to a source&lt;/cite&gt;&lt;/p&gt;\n\t\t\t\t&lt;dl&gt;&lt;dt&gt;definition:&lt;/dt&gt;&lt;dd&gt;definition list of terms and descriptions&lt;/dd&gt;'/></VBox></mvc:View>\n"
}, "web/ui5/test-resources/sap/m/demokit/sample/FormattedText/Component-preload");