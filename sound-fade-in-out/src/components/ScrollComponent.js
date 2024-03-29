import React, { Component } from "react";
import axios from "axios";

class ScrollComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            loading: false,
            page: 0,
            prevY: 0
        }
    }

    componentDidMount() {
        this.getPhotos(this.state.page);

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const lastPhoto = this.state.photos[this.state.photos.length - 1];
            const curPage = lastPhoto.albumId;
            this.getPhotos(curPage);
            this.setState({ page: curPage });
        }
        this.setState({ prevY: y });
    }

    getPhotos(page) {
        this.setState({ loading: true }, () => {
            axios
                .get(
                    `https://jsonplaceholder.typicode.com/photos?_page:${page}&_limit=5`
                )
                .then(res => {
                    console.log(res);
                    console.log(this.state.photos)
                    this.setState({ photos: [...this.state.photos, ...res.data] });
                    this.setState({ loading: false });
                });
        });
    }

    render() {
        // Additional css
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };

        // To change the loading icon behavior
        const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

        return (
            <div className="container">
                <div style={{ minHeight: "800px" }}>
                    {this.state.photos.map((e, i) => (
                        <img key={i} src={e.url} height="100px" width="200px" />
                    ))}
                </div>
                <div ref={loadingRef => (this.loadingRef = loadingRef)} style={loadingCSS}>
                    <span style={loadingTextCSS}>Loading...</span>
                </div>
            </div>
        );
    }
}
export default ScrollComponent;