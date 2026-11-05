import assert from "node:assert/strict";
import { serviceContentSections } from "../src/lib/service-template/content-sections";

const html =
  '<p>Intro</p><h2 id="overview">Overview &amp; details</h2><p>Body <strong>kept</strong>.</p><h3>How it works</h3><ol><li>First</li><li>Second</li></ol>';
const sections = serviceContentSections(html);
assert.equal(sections.length, 3);
assert.equal(
  sections[1].heading,
  '<h2 id="overview">Overview &amp; details</h2>',
);
assert.equal(sections[2].heading, "<h2>How it works</h2>");
assert.equal(
  sections.map((s) => (s.heading || "") + s.html).join(""),
  html.replace(/<(\/?)h3>/g, "<$1h2>"),
);
for (const unsafe of [
  "<div><h2>Nested</h2><p>Body</p></div>",
  "<h3>Heading<p>Accidental paragraph</p></h3>",
  "<h2>Unclosed</h2><div>Body",
  `<h3>${"Long text ".repeat(30)}</h3><p>Body</p>`,
]) {
  assert.deepEqual(serviceContentSections(unsafe), [
    { heading: null, html: unsafe },
  ]);
}
const mixed =
  "<h2>Valid heading</h2><p>Body</p><h3>Bad<p>Not a title</p></h3><p>Still here</p><h3>Next section</h3><p>End</p>";
assert.equal(
  serviceContentSections(mixed)[0].html,
  "<p>Body</p><h3>Bad<p>Not a title</p></h3><p>Still here</p>",
);
console.log(
  "Service content: boundaries, preservation, inline markup, nested and malformed HTML checks passed.",
);

const legacy =
  '<p>Intro</p><p><strong>How does it work?</strong></p><p>Details</p><ul><li><strong>First feature:</strong> A <a href="/details">link</a>.</li><li><strong>Second feature:</strong> Another body.</li></ul>';
assert.equal(serviceContentSections(legacy).length, 4);
assert.match(
  serviceContentSections(legacy)[2].html,
  /<a href="\/details">link<\/a>/,
);
assert.equal(
  serviceContentSections(
    "<h4>Magazine format</h4><p>Intro</p><h4>Print</h4><p>Details</p>",
  ).length,
  2,
);
assert.equal(
  serviceContentSections(
    "<p><strong>Product Name</strong> makes events fun.</p>",
  )[0].heading,
  null,
);
assert.equal(
  serviceContentSections(
    "<p><strong>1. Take a photo</strong></p><p>Instructions</p>",
  )[0].heading,
  null,
);
const repeated =
  "<p><strong>Custom Photo Frame</strong> Every frame has a logo.</p><p><strong>Instant Digital Photo</strong> Guests scan a code.</p><p><strong>Premium Event Experience</strong> Brands plan their theme.</p>";
assert.equal(serviceContentSections(repeated).length, 3);
console.log(
  "Legacy editor: bold titles, repeated labels, h4, feature lists and inline-link checks passed.",
);
